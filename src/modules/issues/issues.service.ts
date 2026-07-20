import { error } from "node:console";
import { pool } from "../../db";
import type { Ifilter, Iissue, Iupdate } from "./issue.interface";

const createIssueIntoDB = async (payload: Iissue, id: string) => {
  const { title, description, type } = payload;

  const types = ["bug", "feature_request"];

  if (!type || !title || !description) {
    throw new Error("type,title, description must required");
  } else if (type && !types.includes(type)) {
    throw new Error("type must be bug or feature_request");
  }

  const result = await pool.query(
    `
             INSERT INTO issues (title,description, type, reporter_id) VALUES ($1,$2,$3,$4)
             RETURNING *
             `,
    [title, description, type, id],
  );

  return result.rows[0];
};

const getIssueFromDB = async (payload: Ifilter) => {
  const { sort = "newest", type, status } = payload;

  const validSort = ["newest", "oldest"];

  const validType = ["bug", "feature_request"];
  const validStaus = ["open", "in_progress", "resolved"];

  if (sort && !validSort.includes(sort)) {
    throw new Error("invalid sort");
  } else if (type && !validType.includes(type)) {
    throw new Error("invalid type");
  } else if (status && !validStaus.includes(status)) {
    throw new Error("Invalid status");
  }

  let query = `SELECT * FROM issues`;

  const values: string[] = [];
  const condi: string[] = [];

  if (type) {
    values.push(type);
    condi.push(`type = $${values.length}`);
  }
  if (status) {
    values.push(status);
    condi.push(`status = $${values.length}`);
  }

  if (condi.length > 0) {
    query += ` WHERE ${condi.join(" AND ")}`;
  }

  if (sort === "newest") {
    query += ` ORDER BY created_at DESC`;
  } else {
    query += ` ORDER BY created_at ASC`;
  }
  const result = await pool.query(query, values);

  const issuesResult = result.rows;

  const finalResult = [];

  for (const issue of issuesResult) {
    const reporter = await pool.query(
      `SELECT id,name,role FROM users WHERE id=$1`,
      [issue.reporter_id],
    );

    finalResult.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporter.rows[0],
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }

  return finalResult;
};

const singleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      
      SELECT * FROM issues WHERE id=$1
      
       `,
    [id],
  );

  const issue = result.rows[0];
  if (!issue) {
    throw new Error("Issue not found");
  }
  const reporter = await pool.query(
    `SELECT id,name,role FROM users WHERE id=$1`,
    [issue.reporter_id],
  );

  const finalResult = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporter.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return finalResult;
};

const updateIssueInDB = async (
  payload: Iupdate,
  role: string,
  Issueid: string,
  UserId: string,
) => {
  const result = await pool.query(
    `
         
         SELECT * FROM issues WHERE id=$1
         
         `,
    [Issueid],
  );

  const issue = result.rows[0];
  if (!issue) {
    throw new Error("Issue not found");
  }

  const isContributorAllowed =
    role === "contributor" &&
    issue.reporter_id === Number(UserId) &&
    issue.status === "open";

  if (!isContributorAllowed && role !== "maintainer") {
    throw new Error("Forbidden");
  }

  const { title, description, type, status } = payload;

  if (status && role === "contributor") {
    throw new Error("Forbidden");                 //only mantainer can update status
  }

  if (!title && !description && !type && !status) {
    throw new Error("No update data provided");
  }

  if (type && type !== "bug" && type !== "feature_request") {
    throw new Error("Invalid type");
  }
  if (
    status &&
    status !== "open" &&
    status !== "in_progress" &&
    status !== "resolved"
  ) {
    throw new Error("Invalid status");
  }
  const updateResult = await pool.query(
    `
  UPDATE issues
  SET
  title = COALESCE($1, 
  title),
  description = COALESCE($2, description),
 type = COALESCE($3, type),
 status= COALESCE($4, 'in_progress'),
   updated_at = NOW()
  WHERE id = $5
  RETURNING *
  `,
    [title, description, type, status, Issueid],
  );

  return updateResult.rows[0];
};

const deleteIssueFromDB=async(id:string)=>{
    const result= await pool.query(
       `
       DELETE FROM issues WHERE id=$1
       RETURNING *
      `,[id]
    )
  if(result.rows.length===0){
    throw new Error('issue not found')
  }
}

export const issueService = {
  createIssueIntoDB,
  getIssueFromDB,
  singleIssueFromDB,
  updateIssueInDB,
  deleteIssueFromDB,
};

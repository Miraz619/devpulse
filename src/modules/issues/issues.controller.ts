import { response, type Request, type Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";
import type { JwtPayload } from "jsonwebtoken";


const createIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    // console.log(id);
    const result = await issueService.createIssueIntoDB(req.body, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 500;
    let message = "Internal Server Error";
    if (errorMessage === "type,title, description must required") {
      statusCode = 400;
      message = "type,title, description must required";
    } else if (errorMessage === "type must be bug or feature_request") {
      statusCode = 400;
      message = "type must be bug or feature_request";
    } else if (errorMessage.includes("violates check constraint")) {
      statusCode = 400;
      message = "Invalid input";
    }

    sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
};

const getAllIssue = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getIssueFromDB(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrived successfully",
      data: issues,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 500;
    let message = "Internal Server Error";

    if (
      errorMessage === "invalid sort" ||
      errorMessage === "invalid type" ||
      errorMessage === "Invalid status"
    ) {
      statusCode = 400;
      message = "Invalid query parameter";
    }

    sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
};

const singleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issueService.singleIssueFromDB(id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 500;
    let message = "Internal Server Error";

    if (errorMessage === "Issue not found") {
      statusCode = 404;
      message = "Issue not found";
    }
    sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const { role, id: UserId } = req.user as JwtPayload;
    const { id } = req.params;

    const result = await issueService.updateIssueInDB(
      req.body,
      role,
      id as string,
      UserId,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 500;
    let message = "Internal Server Error";

    if (errorMessage === "Issue not found") {
      statusCode = 404;
      message = "Issue not found";
    } else if (errorMessage === "Forbidden") {
      statusCode = 403;
      message = "Forbidden";
    } else if (errorMessage === "No update data provided") {
      statusCode = 400;
      message = "No update data provided";
    } else if (errorMessage === "Invalid type") {
      statusCode = 400;
      message = "Invalid type";
    } else if (errorMessage === "Invalid status") {
      statusCode = 400;
      message = "Invalid status";
    }
    sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issueService.deleteIssueFromDB(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "something went wrong";

    let statusCode = 500;
    let message = "Internal Server Error";

    if (errorMessage === "issue not found") {
      statusCode = 404;
      message = "issue not found";
    }
     sendResponse(res, {
      statusCode,
      success: false,
      message,
      errors: errorMessage,
    });
  }
};
export const issueController = {
  createIssue,
  getAllIssue,
  singleIssue,
  updateIssue,
  deleteIssue,
};

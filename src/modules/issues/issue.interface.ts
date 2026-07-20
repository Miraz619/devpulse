
export interface Iissue{
    title: string;
    description: string;
    type: string;
    
}


export interface Ifilter{
    sort?:string;
    type?:string;
    status?:string;
}

export interface Iupdate{
   title?:string;
   description?:string;
   type?:string;
   status?:string;
}



export type ROLES= 'contributor' | 'maintainer'

export const USER_ROLE={

    contributor:'contributor',
    maintainer:'maintainer'

}as const


export type TResponse<T,U>={

 statusCode:number;
 success: boolean;
 message: string;
 data?: T;
 errors?: U;
}

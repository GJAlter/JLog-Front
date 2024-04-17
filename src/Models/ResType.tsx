export class ResType {

    statusCode: number;
    message: string;
    result: any;
    
    constructor(statusCode: number, message: string, result: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.result = result;
    }

    static fromJson(data: {[key: string]: any}): ResType {
        return new ResType(
            data["statusCode"], 
            data["message"], 
            data["result"]
        )
    }

}

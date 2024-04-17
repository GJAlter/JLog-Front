export class Page {

    data: Array<{[key: string]: any}>;
    totalPage: number;
    
    constructor(data: Array<{[key: string]: any}>, totalPage: number) {
        this.data = data;
        this.totalPage = totalPage
    }

    static fromJson(data: {[key: string]: any}): Page {
        return new Page(
            data["data"],
            data["totalPage"],
        )
    }

}

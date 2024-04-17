export class Posts {
    
    id: string;
    title: string;
    contentPreview: string;
    modifiedDatetime: Date;
    
    constructor(id: string, title: string, contentPreview: string, modifiedDatetime: Date) {
        this.id = id;
        this.title = title;
        this.contentPreview = contentPreview;
        this.modifiedDatetime = modifiedDatetime;
    }

    static fromJson(data: {[key: string]: any}): Posts {
        return new Posts(
            data["id"],
            data["title"],
            data["contentPreview"],
            data["modifiedDatetime"]
        );
    }

}
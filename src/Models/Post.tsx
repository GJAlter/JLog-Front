export class Post {

    id: string;
    title: string;
    content: string;
    modifiedDatetime: string;
    comments: Array<any>;
    attaches: Array<string>;

    constructor(id: string, title: string, content: string, modifiedDatetime: string, comments: Array<any>, attaches: Array<string>) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.modifiedDatetime = modifiedDatetime;
        this.comments = comments;
        this.attaches = attaches;
    }

    static fromJson(data: {[key: string]: any}): Post {
        return new Post(
            data["id"],
            data["title"],
            data["content"],
            data["modifiedDatetime"],
            data["comments"],
            data["attaches"]
        );
    }
}
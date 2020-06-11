export interface User {
    username: string,
    email: string
    dateJoined?: Date
};

export interface Bookmark {
    title: string,
    tags: Array<Tag>,
    description: string,
    dateCreated: Date,
    modifications: Array<Modification>
};

export interface Modification {}

export interface Tag {

};
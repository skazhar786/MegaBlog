import conf from "../conf/conf.js";
import { Client, ID, Query, Storage, TablesDB } from "appwrite";

export class Service {
    client = new Client();
    tablesdb;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesdb = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesdb.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Create Post Error:", error);
            return null;
        }
    }

    // Update Post
    async updatePost({ title, slug, content, featuredImage, status }) {
        try {
            return await this.tablesdb.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Update Post Error:", error);
            return null;
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.tablesdb.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Delete Post Error:", error);
            return false;
        }
    }

    // Get Single Post
    async getPost(slug) {
        try {
            return await this.tablesdb.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Get Post Error:", error);
            return null;
        }
    }

    // Get All Posts
    async getPosts(queries = []) {
    try {
        const response = await this.tablesdb.listRows(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );

        console.log("getPosts Response:", response);

        return response;
    } catch (error) {
        console.error("getPosts Error:", error);
        return null;
    }
}

    // Upload File
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Upload File Error:", error);
            return null;
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Delete File Error:", error);
            return false;
        }
    }

    // File Preview
    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();

export default service;
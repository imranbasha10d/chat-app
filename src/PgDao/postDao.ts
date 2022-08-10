import { Post } from '../Utils/types';
import { Log } from "../Logger";
import { v4 as uuid } from "uuid";
import PgDatabase from "../PgDatabase/pgDatabase";
import { getQueryIds } from "../Utils/pgMethods";

export class PostDao {
    public async createPost(data: Post): Promise<any> {
        Log.info('createPost dao input data', data);
        try {
            const id = uuid();
            await PgDatabase.query("INSERT INTO posts (_id, caption, \"mediaUrl\", \"ownerId\") VALUES ($1,$2,$3,$4)", [
                id,
                data.caption,
                data.mediaUrl,
                data.ownerId
            ]);
            const newPost = await this.getPostById(id);
            Log.info('return of createPost dao', newPost);
            return newPost;
        } catch (error) {
            Log.error('Error in createPost dao', error);
            return error.message;
        }
    }
    public async getAllPostsByOwnerId(ownerId: string, limit: number, offset: number): Promise<any> {
        Log.info('getAllPostsByOwnerId dao input ownerId', ownerId);
        Log.info('getAllPostsByOwnerId dao input limit', limit);
        Log.info('getAllPostsByOwnerId dao input offset', offset);
        try {
            const posts = await PgDatabase.query(`SELECT * FROM posts where \"ownerId\"=$1 LIMIT $2 OFFSET $3`, [ownerId, limit, offset])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch post query', rows);
                    if (rows.length > 0) return rows;
                    return [];
                })
                .catch((error) => {
                    Log.error('Error in fetch post query', error);
                    return null;
                });
            Log.info('return of getAllPostsByOwnerId dao', posts);
            return posts;
        } catch (error) {
            Log.error('Error in getAllPostsByOwnerId dao', error);
            return error.message;
        }
    }
    public async getAllPostsByOwnerIds(ownerIds: string[], limit: number, offset: number): Promise<any> {
        Log.info('getAllPostsByOwnerIds dao input ownerId', ownerIds);
        Log.info('getAllPostsByOwnerIds dao input limit', limit);
        Log.info('getAllPostsByOwnerIds dao input offset', offset);
        try {
            if (!ownerIds.length) return [];
            const queryIds = getQueryIds(ownerIds);
            const posts = await PgDatabase.query(`SELECT * FROM posts where \"ownerId\" in (${queryIds}) LIMIT $1 OFFSET $2`, [limit, offset])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch post query', rows);
                    if (rows.length > 0) return rows;
                    return [];
                })
                .catch((error) => {
                    Log.error('Error in fetch post query', error);
                    return null;
                });
            Log.info('return of getAllPostsByOwnerIds dao', posts);
            return posts;
        } catch (error) {
            Log.error('Error in getAllPostsByOwnerIds dao', error);
            return error.message;
        }
    }
    public async getPostById(id: string): Promise<any> {
        Log.info('getPostById dao input id', id);
        try {
            const post = await PgDatabase.query(`SELECT * FROM posts where _id=$1`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch post query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch post query', error);
                    return null;
                });
            Log.info('return of getPostById dao', post);
            return post;
        } catch (error) {
            Log.error('Error in getPostById dao', error);
            return error.message;
        }
    }
    public async updatePostCaptionById(id: string, caption: string, ownerId: string): Promise<any> {
        Log.info('updatePostCaptionById dao input id', id);
        Log.info('updatePostCaptionById dao input caption', caption);
        Log.info('updatePostCaptionById dao input ownerId', ownerId);
        try {
            const updatedPost = await PgDatabase.query(`UPDATE posts SET caption=$1 where _id=$2 AND \"ownerId\"=$3`, [caption, id, ownerId])
                .then(async () => {
                    Log.info('Success updated post query');
                    const post = await this.getPostById(id);
                    Log.info('Return value from getPostById: post: ', post);
                    return post;
                })
                .catch((error) => {
                    Log.error('Error in updated post query', error);
                    return null;
                });
            Log.info('return of updatePostCaptionById dao', updatedPost);
            return updatedPost;
        } catch (error) {
            Log.error('Error in updatePostCaptionById dao', error);
            return error.message;
        }
    }
    public async deletePostById(id: string): Promise<any> {
        Log.info('deletePostById dao input id', id);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM posts where _id=$1 RETURNING *`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted post query', rows);
                    return id;
                })
                .catch((error) => {
                    Log.error('Error in deleted post query', error);
                    return null;
                });
            Log.info('return of deletePostById dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deletePostById dao', error);
            return error.message;
        }
    }
    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        Log.info('deleteAllPostsByUserId dao input userId', userId);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM posts where \"ownerId\"=$1 RETURNING *`, [userId])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted post query', rows);
                    return userId;
                })
                .catch((error) => {
                    Log.error('Error in deleted post query', error);
                    return null;
                });
            Log.info('return of deleteAllPostsByUserId dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deleteAllPostsByUserId dao', error);
            return error.message;
        }
    }
}
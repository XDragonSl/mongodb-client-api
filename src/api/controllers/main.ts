import DBConnect from '../models/db'

import { Connection } from 'mongoose'
import { MongoError, Collection } from 'mongodb'
import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../types/error';

export = {
    collections: (req: Request, res: Response, next: NextFunction) => {
        DBConnect(req.body.uri, (connection: Connection) => {
            connection.db.collections((error: MongoError, collections: Array<Collection<any>>) => {
                connection.close();
                if (error) {
                    res.status(404).json(error);
                } else {
                    if (collections) {
                        res.status(200).json(collections.map((collection: Collection<any>) => {
                            return collection.collectionName
                        }));
                    } else {
                        res.status(404).json({
                            message: 'Collections not found'
                        });
                    }
                }
            });
        })
    },
    documents: (req: Request, res: Response, next: NextFunction) => {
        DBConnect(req.body.uri, (connection: Connection) => {
            let collection = connection.db.collection(req.body.collection);
            collection.find().toArray((error: ServerError, documents: Array<any>) => {
                connection.close();
                if (documents) {
                    res.status(200).json(documents);
                } else {
                    res.status(404).json({
                        message: 'Documents not found'
                    });
                }
            });
        })
    }
};

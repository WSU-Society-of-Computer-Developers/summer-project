import { Request, Response, NextFunction } from "express";
import client from "./redis";
export interface routeOptions {
  key: string;
  base: Boolean;
  id: Boolean;
}

export interface keyValid {
  key: string;
  valid: Boolean;
}

export function cacheMiddleware(options: routeOptions) {
  let queryResolve: Function = Function;
  if (options.base) {
    queryResolve = function key_id(
      req: Request,
      res: Response,
      next: NextFunction
    ): keyValid {
      return { key: `${options.key}`, valid: true };
    };
  } else if (options.id) {
    queryResolve = function key_id(
      req: Request,
      res: Response,
      next: NextFunction
    ): keyValid {
      const id = req.params.id;
      if (!id) {
        // res.status(400).json({ error: "`id` parameter is required" });
        return { key: "", valid: false };
      }
      return { key: `${options.key}-${req.params.id}`, valid: true };
    };
  }
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { key, valid } = queryResolve(req, res);
      req.params.idIsValid = valid ? "true" : "false";
      if (!valid) {
        return next();
      }
      req.params.cacheKey = key;
      const cachedData = await client.get(req.params.cacheKey);
      if (!cachedData) {
        return next();
      }
      res.status(200).json({ body: JSON.parse(cachedData) });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
}

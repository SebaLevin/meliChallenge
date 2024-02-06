import { mockResponse } from "../utils/mockResponse.utils.js";

export const tokenAuthMiddleware = (req, res, next) => {

  const token = req.headers["x-auth-token"];
  const docURL = "/api/docs/";


    if (!req.headers["x-auth-token"] && req.url !== docURL) {

      return res.status(401).send({message: "Unauthorized"});
    }
   

    if (token === 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc' && req.url !== docURL) {
       next();
    } else if (token === '55a4639f-55e8-4e14-a6cc-b79977b20a4e' && req.url !== docURL) {
      return res.status(200).json(mockResponse)
    } else if (req.url !== docURL) {
      return res.status(401).send({message: "Please, provide a valid token"});
    }


}
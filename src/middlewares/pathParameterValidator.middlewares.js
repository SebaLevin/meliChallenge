
export const pathParameterValidatorMiddleware = (req, res, next) => {

    const allowedSiteIds = [
        'MLA',
        'MLB',
        'MLM'
    ];

    const validSorts = [
        'price_asc',
        'price_desc'
    ];

    const validIdRegex = [
        /^MLA\d+$/,
        /^MLB\d+$/,
        /^MLM\d+$/
    ];

    const { siteId } = req.params;

    const { id } = req.params;

    const { limit, offset, sort } = req.query;

    if (id && !validIdRegex.some(regex =>  regex.test(id))) {
        return res.status(400).send({ message: "Invalid Id Parameters" });
    }

    if ((limit && isNaN(limit)) || (offset && isNaN(offset))) {
      return res.status(400).send({ message: "Invalid Query Parameters" });
    }

    if (sort && !validSorts.includes(sort)) {
      return res.status(400).send({ message: "Invalid Sort Parameters" });
    }

    if (siteId && !allowedSiteIds.includes(siteId)) {
       return res.status(400).send({ message: "Invalid SiteId Parameters" });
    }

    next();
}
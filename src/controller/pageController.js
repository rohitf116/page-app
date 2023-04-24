const Page= require("../model/PageModel")

exports.getPages = async (req, res) => {
    try {

  
      // Set the initial query object to find pages
      let query = {  isDeleted: false };
  
      // If a page ID is provided in the query string, add it to the query

  
      // Pagination
      const allPages = await Page.find(query);
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit;
      const sort = { createdAt: -1 };
      if (req?.query?.sort == 1) {
        sort.createdAt = 1;
      }
  
      // Find the total number of pages
      const totalPages = await Page.find();
  
      // Find the pages that match the query and sort them
      const pages = await Page.find(query).skip(skip).limit(limit).sort(sort);
      if (!pages) {
        res.status(404).json({ success: false, message: notFound("page") });
      }
  
      // Send the response with the pages that match the query
      res.status(200).json({
        success: true,
        totalPages: totalPages.length,
        length: pages.length,
        numOfPages: allPages.length,
        pages,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  function extractHeaderAndRest(inputString) {
    const headerPattern = /<header\b[^>]*>([\s\S]*?)<\/header>/i;
    const match = inputString.match(headerPattern);
    if (match) {
      const headers = match[0];
      const rest = inputString.replace(match[0], '');
      return { headers, rest };
    } else {
      return { headers: null, rest: inputString };
    }
  }
  
  
  function removeNewlinesAndEscapedQuotes(response) {
    return response.replace(/[\n\\"']/g, '');
  }
  
  
  exports.getPageHtmlWithHeaders = async (req, res) => {
    try {
      const id = req.params.id;
      // Check if a page ID is provided.

  

  
      // Get the total number of pages in the database.
  
      // Find the page based on the provided ID and include its content and assets.
      const page = await Page.findById(id).select("+content +assets");
  
      // If no page is found, return a 404 error.
      if (!page) {
        res.status(404).json({ success: false, message: notFound("page") });
        return;
      }

      // const headers = domain.metadata.headers;
      // console.log(headers);
      const content = page?.content;
      // console.log(content)
      const section = removeNewlinesAndEscapedQuotes(content?.html);
      const items=extractHeaderAndRest(section)
      // console.log(section)
      const headers=removeNewlinesAndEscapedQuotes(items?.headers)
      const rest=removeNewlinesAndEscapedQuotes(items?.rest)
      const css=content?.css
      const html = `<!DOCTYPE html><html><head><title>My Page</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${css || "NoStyle"}</style> ${headers || "empty"}</head><body>${rest || "empty"}</body></html>`;
      // Return the page and the total number of pages in the database.
      res.status(200).json({ success: true, html });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
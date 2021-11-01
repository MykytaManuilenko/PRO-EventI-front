export default async function activateUser(req, res) {
    const hash = req.query.hash;
    const requestId = req.query.request_id;
    if (!hash) {
      return res.status(401).json({message: 'Cannot Validate an User!'})
    }
  
    const response = await fetch(`http://localhost:3001/api/confirmations/:{requestId}/registration`);
    if (response.status >= 400) {
      return res.status(401).json({message: 'Cannot Validate an User!'})
    } else {
      res.writeHead(307, { Location: '/users/activated' });
      res.end();
    }
  }
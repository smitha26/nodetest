import * as express from "express";
let router = express.Router();

  let products = [
  {id:1, name:'Coffee'},
  {id:2, name:'Cheese'},
  {id:3, name:'Tesla'}
];

router.get("/", (req, res) =>{
  res.send(products)
});


//get count of products
router.get("/count", (req, res)=>{
  res.send(products.length.toString())
});
export default router;

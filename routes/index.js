var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/request',function(req,res){
	var data = req.data;
	var t = new data.Request({"name":req.body.name, "address_from": req.body.fromAddress, "address_to": req.body.toAddress, "time":req.body.time})
	t.save(function(err){
		if(err){
			res.send("There was a problem");
		}else{
			res.redirect("/");
		}
	});
})


module.exports = router;

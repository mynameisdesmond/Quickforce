var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quickforce' });
});

router.get('/admin', function(req,res){
	var data = req.data;
	if (req.session.admin){
		data.Request.find({},function(e,requests){
			res.render('requests', {"requests": requests});
		})
		
	} else {
		res.redirect('/login');
	}
})

router.post('/clearall', function(req,res){
	var data = req.data;
	if (req.session.admin){
		data.Request.remove({}, function(err){
			console.log("remove all request");
			res.redirect('/admin');
		});
	} else {
		res.redirect('/');
	}
})

router.get('/login', function(req,res){
	res.render('login');
})

router.post('/login', function(req,res){
	if (req.body.username == "Quickforce" && req.body.password == "medialab1234"){
		req.session.admin = {"admin": true};
		console.log('log in');
		res.redirect("/admin");
	} else {
		res.send("password incorrect");
		console.log('wrong password');
	}
})

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

router.get('/logout',function(req,res){
	req.session.destroy(function(){
    res.redirect('/');
  });
})


module.exports = router;

const fs = require("fs");
const data = require('./data.json');

exports.post = function(req, res) {

  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "")
    return res.send("Please, fill all fields");
  }

  let { id, avatar_url, name, birth, tipoaula, service } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  id = Number(data.teachers.length + 1);


  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    tipoaula,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return res.send('Write file error!');
    }

    return res.redirect('/teachers');
  })

  //return res.send(req.body);
}

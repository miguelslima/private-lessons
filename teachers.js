const fs = require("fs");
const data = require('./data.json');
const { age, date, graduation, tipoaula} = require('./utils');

exports.post = function(req, res) {

  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "")
    return res.send("Please, fill all fields");
  }

  let { id, avatar_url, select, name, birth, tipoaula, services } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  id = Number(data.teachers.length + 1);


  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    select,
    tipoaula,
    services,
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

exports.show = function(req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id;
  });

  if(!foundTeacher) {
    return res.send('Teacher not found!');
  }

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    created_at: new Intl.DateTimeFormat('en-GB').format(foundTeacher.created_at), 
    graduation: graduation(foundTeacher.select),
    tipoaula: tipoaula(foundTeacher.tipoaula)
  }

  return res.render("teachers/show", { teacher });
}

exports.edit = function(req, res) {
  return res.render("teachers/edit");
}

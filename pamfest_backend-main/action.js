const md5 = require("md5");
const mysql = require("mysql");
const { nanoid } = require("nanoid");
const db = require("./connection");
const hashedPassword = md5("password");

exports.main = function (req, res) {
  res.status(200).json({
    success: true,
    message: "Welcome to SoFit API",
  });
};

// Auth Action
// Function for get all admin
exports.getadmin = function (req, res) {
  let query = "SELECT * FROM admin";
  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    }
    res.status(200).json({
      success: true,
      message: "Get admin success",
      data: rows,
    });
  });
};

// Function for register
exports.register = function (req, res) {
  const id = nanoid(7);
  const add = {
    username: req.body.username,
    password: hashedPassword,
  };

  // Check if username already exists
  let query = "SELECT * FROM admin WHERE username = ?";
  const value = add.username;

  query = mysql.format(query, value);

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    }
    if (rows.length > 0) {
      res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    } else {
      const data = {
        id,
        username: add.username,
        password: add.password,
      };
      let query = "INSERT INTO admin SET ?";
      query = mysql.format(query, data);
      db.query(query, data, (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Internal Server Error",
            err,
          });
        } else {
          res.status(201).json({
            success: true,
            message: "Register success",
            data: {
              username: data.username,
            },
          });
        }
      });
    }
  });
};

// Function for login
exports.login = function (req, res) {
  const add = {
    username: req.body.username,
    password: hashedPassword,
  };

  // Check if email and password match
  let query = "SELECT * FROM admin WHERE username = ? AND password = ?";
  const value = [add.username, add.password];

  query = mysql.format(query, value);
  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    }
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login success",
        data: {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Username or password wrong",
      });
    }
  });
};
// End of Auth Action

// Festival Action
// Function for add festival
exports.addfestival = function (req, res) {
  const id = req.body.id;
  const add = {
    id,
    nama: req.body.nama,
    jadwal: req.body.jadwal,
    lokasi: req.body.lokasi,
    jenis: req.body.jenis,
    gmaps: req.body.gmaps,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
  };

  db.query("INSERT INTO festival SET ?", add, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Add festival success",
        add,
      });
    }
  });
};

// Funtion for edit festival
exports.editFestival = function (req, res) {
  const id = req.params.id;
  const edit = {
    nama: req.body.nama,
    jadwal: req.body.jadwal,
    lokasi: req.body.lokasi,
    jenis: req.body.jenis,
    gmaps: req.body.gmaps,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
  };

  db.query("UPDATE festival SET ? WHERE id = ?", [edit, id], (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Edit festival success",
        data: {
          id,
          nama: edit.nama,
          jadwal: edit.jadwal,
          lokasi: edit.lokasi,
          jenis: edit.jenis,
          gmaps: edit.gmaps,
          deskripsi: edit.deskripsi,
          foto: edit.foto,
        },
      });
    }
  });
};

// Function for delete festival
exports.deleteFestival = function (req, res) {
  const id = req.params.id;

  db.query("DELETE FROM festival WHERE id = ?", id, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Delete festival success",
      });
    }
  });
};

// Function for get all festival
exports.getAllFestival = function (req, res) {
  db.query("SELECT * FROM festival", (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get all festival success",
        rows,
      });
    }
  });
};

// Function for get festival by id
exports.getFestivalById = function (req, res) {
  const id = req.params.id;

  db.query("SELECT * FROM festival WHERE id = ?", id, (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Festival not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get festival by id success",
        data: rows[0],
      });
    }
  });
};

// Function for get festival by name
exports.getFestivalByName = function (req, res) {
  var name = req.params.nama;
  if(name=="null"){
    name="";
  }

  db.query("SELECT * FROM `festival` WHERE `nama` LIKE ?", ['%'+name+'%'], (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get all festival success",
        rows,
      });
    }
  });
};

// End of Festival Action

// Pameran Action
// Function for add pameran
exports.addpameran = function (req, res) {
  // const id = nanoid(7);
  const add = {
    id: req.body.id,
    nama: req.body.nama,
    jadwal: req.body.jadwal,
    lokasi: req.body.lokasi,
    jenis: req.body.jenis,
    gmaps: req.body.gmaps,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
  };

  db.query("INSERT INTO pameran SET ?", add, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Add pameran success",
        data: add,
      });
    }
  });
};

// Function for edit pameran
exports.editPameran = function (req, res) {
  const id = req.params.id;
  const edit = {
    nama: req.body.nama,
    jadwal: req.body.jadwal,
    lokasi: req.body.lokasi,
    jenis: req.body.jenis,
    gmaps: req.body.gmaps,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
  };

  db.query("UPDATE pameran SET ? WHERE id = ?", [edit, id], (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Edit pameran success",
        data: {
          id,
          nama: edit.nama,
          jadwal: edit.jadwal,
          lokasi: edit.lokasi,
          jenis: edit.jenis,
          gmaps: edit.gmaps,
          deskripsi: edit.deskripsi,
          foto: edit.foto,
        },
      });
    }
  });
};

// Function for delete pameran
exports.deletePameran = function (req, res) {
  const id = req.params.id;

  db.query("DELETE FROM pameran WHERE id = ?", id, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Delete pameran success",
      });
    }
  });
};

// Function for get all pameran
exports.getAllPameran = function (req, res) {
  db.query("SELECT * FROM pameran", (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get all pameran success",
        data: rows,
      });
    }
  });
};

// Function for get pameran by id
exports.getPameranById = function (req, res) {
  const id = req.params.id;

  db.query("SELECT * FROM pameran WHERE id = ?", id, (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Pameran not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get pameran by id success",
        data: rows[0],
      });
    }
  });
};

// Function for get pameran by name
exports.getPameranByName = function (req, res) {
  var name = req.params.nama;
  if(name=="null"){
    name="";
  }

  db.query("SELECT * FROM `pameran` WHERE `nama` LIKE ?", ['%'+name+'%'], (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get all festival success",
        rows,
      });
    }
  });
};

// End of Pameran Action

// Booking Action
exports.addbooking = function (req, res) {
  const id = nanoid(7);
  const add = {
    id,
    nama: req.body.nama,
    nohp: req.body.nohp,
    jumlahorang: req.body.jumlahorang,
    jam: req.body.jam,
    jadwal: req.body.jadwal,
    kegiatan: req.body.kegiatan,
  };

  db.query("INSERT INTO booking SET ?", add, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Add booking success",
        data: add,
      });
    }
  });
};

exports.editBooking = function (req, res) {
  const id = req.params.id;
  const edit = {
    nama: req.body.nama,
    nohp: req.body.nohp,
    jumlahorang: req.body.jumlahorang,
    jam: req.body.jam,
    jadwal: req.body.jadwal,
    kegiatan: req.body.kegiatan,
  };

  db.query("UPDATE booking SET ? WHERE id = ?", [edit, id], (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Edit booking success",
        data: {
          id,
          nama: edit.nama,
          nohp: edit.nohp,
          jumlahorang: edit.jumlahorang,
          jadwal: edit.jadwal,
          kegiatan: edit.kegiatan,
        },
      });
    }
  });
};

exports.deleteBooking = function (req, res) {
  const id = req.params.id;

  db.query("DELETE FROM booking WHERE id = ?", id, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Delete booking success",
      });
    }
  });
};

exports.getAllBooking = function (req, res) {
  db.query("SELECT * FROM booking", (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get all booking success",
        data: rows,
      });
    }
  });
};

exports.getBookingById = function (req, res) {
  const id = req.params.id;

  db.query("SELECT * FROM booking WHERE id = ?", id, (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } else if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get booking by id success",
        data: rows[0],
      });
    }
  });
};

module.exports = (app) => {
  const handler = require("./action");

  // Auth routes
  app.route("/").get(handler.main);
  app.route("/admin").get(handler.getadmin);
  app.route("/register").post(handler.register);
  app.route("/login").post(handler.login);
  // End of Auth routes

  // Festival routes
  app.route("/festival").get(handler.getAllFestival);
  app.route("/addfest").post(handler.addfestival);
  app.route("/editfest/:id").put(handler.editFestival);
  app.route("/deletefest/:id").delete(handler.deleteFestival);
  app.route("/fest/:id").get(handler.getFestivalById);
  app.route("/fest-nama/:nama").get(handler.getFestivalByName);
  // End of Festival routes

  // Pameran routes
  app.route("/pameran").get(handler.getAllPameran);
  app.route("/addpameran").post(handler.addpameran);
  app.route("/editpameran/:id").put(handler.editPameran);
  app.route("/deletepameran/:id").delete(handler.deletePameran);
  app.route("/pameran/:id").get(handler.getPameranById);
  app.route("/pameran-nama/:nama").get(handler.getPameranByName);

  // End of Pameran routes

  // Booking routes
  app.route("/book").post(handler.addbooking);
  app.route("/editbooked/:id").put(handler.editBooking);
  app.route("/deletebooked/:id").delete(handler.deleteBooking);
  app.route("/booked").get(handler.getAllBooking);
  app.route("/booked/:id").get(handler.getBookingById);
};

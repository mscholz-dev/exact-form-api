// test
import "./test/test.new-db.test.js";

// user
import "./user/user.create.test.js";
// import "./user/user.connection.test.js";
// import "./user/user.profile.test.js";
// import "./user/user.update.test.js";
// import "./user/user.createEmailToken.test.js";
// import "./user/user.disconnection.test.js";

// test
// import "./test/test.getTokenEmail.test.js";

// auth
// import "./auth/auth.index.test.js";
// import "./auth/auth.hasEmailToken.test.js";

// form
import "./form/form.create.test.js";
import "./form/form.getAll.test.js";
import "./form/form.createItem.test.js";
import "./form/form.getSpecificForm.test.js";
import "./form/form.deleteItem.test.js";
import "./form/form.deleteManyItem.test.js";
import "./form/form.editItem.test.js";
import "./form/form.deleteForm.test.js";
import "./form/form.udpateForm.test.js";
import "./form/form.recoverItem.test.js";

// user
// import "./user/user.updateEmail.test.js";

// contact
// import "./contact/contact.create.test.js";

// error
// import "./error/error.create.test.js";

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

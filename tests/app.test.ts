// test
import "./test/test.new-db.test.js";

// user
import "./user/user.create.test.js";
import "./user/user.connection.test.js";
import "./user/user.update.test.js";
import "./user/user.createEmailToken.test.js";
import "./user/user.disconnection.test.js";

// test
import "./test/test.getTokenEmail.test.js";

// auth
import "./auth/auth.index.test.js";
import "./auth/auth.hasEmailToken.test.js";

// user
import "./user/user.updateEmail.test.js";

// contact
import "./contact/contact.create.test.js";

// error
import "./error/error.create.test.js";

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

import express from 'express';
import bodyParser from 'body-parser';
import pg from "pg";
import bcrypt from "bcrypt";
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';


// JANGAN DIUBAH2 YA GESS UNTUK FILE INI, KALO DASHBOARD SAMA RESPONSIVE UDH SELESAI TINGGAL INSTAL NODE MODULE SAMA RAPIHIN STRUKTUR
// FOLDER

const app = express();
const port = 3000;
const saltRounds = 9;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

app.use(
    session({
        secret:"TOPSECRETWORD",
        resave:false,
        saveUninitialized:true,
        // expired waktu cookies session jadi 24 jam
        cookie:{
            maxAge:1000*60*60*24,
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "maven",
    password: "#Pofadhilsky99",
    port: 5432,
  });
  db.connect();

app.get('/', (req,res)=>{
  if(req.isAuthenticated()){
      console.log(req.user.email);
    res.render("home.ejs",{login:true});
    }else{
    res.render("home.ejs",{login:false});
    
    }
});

app.get('/login', (req,res)=>{
    res.render("login.ejs")
});

app.get('/register', (req,res)=>{
    res.render("register.ejs")
});


app.get('/aboutus', (req,res)=>{
    res.render("aboutus.ejs")
});

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("dashboard.ejs");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });


app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

app.post("/register",async (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
    
        if (checkResult.rows.length > 0) {
          req.redirect("/login");
        } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await db.query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                [email, hash]
              );
              const user = result.rows[0];
              req.login(user, (err) => {
                console.log("success");
                res.redirect("/");
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
})

passport.use(
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});
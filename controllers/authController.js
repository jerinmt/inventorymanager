function authenticateGet(req, res) {
    const nextPath = req.url;
    res.render("authForm", {nextPath: nextPath});
}

function authenticatePost(req, res) {
    const passcode = req.body.passcode;
    const path = req.body.nextPath;
    if(passcode == process.env.PASSCODE) {
        res.redirect(`${path}`);
    } else {
        res.render("authFailed");
    }
}


module.exports = {
  authenticateGet, authenticatePost
};
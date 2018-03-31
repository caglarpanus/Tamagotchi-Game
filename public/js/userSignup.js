$(() => {
  const name = $("input#name");
  const email = $("input#email");
  const password = $("input#password");

  $("form.signup").on("submit", event => {
    event.preventDefault();

    const body = {
      name: name.val().trim(),
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!body.name || !body.email || !body.password) return;

    $.post("/api/user/signup", body)
      .then(href => window.location.replace(href))
      .fail(err => alert(`Error: ${err.responseText}`));

    name.val("");
    email.val("");
    password.val("");
  });
});

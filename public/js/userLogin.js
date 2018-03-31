$(() => {
  const name = $("input#name");
  const password = $("input#password");

  $("form.login").on("submit", event => {
    event.preventDefault();

    const body = {
      name: name.val().trim(),
      password: password.val().trim()
    };

    if (!body.name || !body.password) return;
console.log(body);
    $.post("/api/user/login", body)
      .then(href => window.location.replace(href))
      .fail(err => alert(`Error: ${err.responseText}`));

    name.val("");
    password.val("");
  });
});

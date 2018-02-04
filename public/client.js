nprogress.configure({ showSpinner: false });

vxv`
:global(body) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  margin: 0px;
  padding: 0px;
  left: 0px;
  top: 0px;
}

:global(.bar) {
  background: #000!important;
}
`;

const inputStyles = vxv`
background: #F5F5F5;
padding: 200px 0px;

& input {
  border: solid black 1px;
  padding: 7px 10px;
  outline: none;
}

& span {
  color: gray;
  font-size: 0.7em;
}
`;

const element = xou`<div class="${ inputStyles }">
  <h1>Nouns - A simple word finder</h1>
  <input type="text" placeholder="a word" class="word"><br>
  <span>Press enter to search.</span>
</div>`;

document.body.appendChild(element);

const resultStyles = vxv`
max-width: 720px;
margin: 50px auto;

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color:#f5f5f5;
}
`;

const results = xou`<div class="${ resultStyles }"></div>`;

document.body.appendChild(results);

const update = () => {
  nprogress.start();
  
  fetch(`https://nouns.glitch.me/match?m=` + document.querySelector('.word').value)
    .then(function(response) {
      return response.json()
    }).then(function(body) {
      const newResult = xou`<div class="${ resultStyles }">
        <table>
          ${ body.map((e) => {
            return xou`<tr><td>${ e }</td></tr>`;
          }) }
        </table>
      </div>`;
    
      xou.update(results, newResult);
    
      nprogress.done();
    });
};

document.querySelector('.word').addEventListener('keydown', (ev) => {
  if (vkey[ev.keyCode] == '<enter>') {
    ev.preventDefault();
    update();
  }
}, false);
function enviarFormularioInscricao(e) {
  e.preventDefault();
  const nome = encodeURIComponent(document.getElementById('nomeCompleto').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const instituicao = encodeURIComponent(document.getElementById('instituicao').value);
  window.location.href = `cadastro.html?nome=${nome}&email=${email}&instituicao=${instituicao}`;
}

document.addEventListener('DOMContentLoaded', function() {
  const formInscricao = document.getElementById('formInscricao');
  if (formInscricao) {
    formInscricao.addEventListener('submit', enviarFormularioInscricao);
  }
});
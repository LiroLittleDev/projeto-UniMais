/**
 * Função responsável por pré-preencher os campos do formulário de cadastro com valores vindos da URL (nome, email, instituição) da pagina inicial index para area de cadastro. **/
document.addEventListener("DOMContentLoaded", function () {
  prePreencherCampos();
  configurarValidacaoCadastro();
});

/**
 * prePreencherCampos
 * Pré-preenche os campos do formulário de cadastro com valores vindos da URL (nome, email, instituição) e a parte que recebe as informações da url e insere dentro do formulario de cadastro.
 */
function prePreencherCampos() {
  // Pré-preenchimento dos campos vindos da inscrição
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("nome")) {
    const nome = decodeURIComponent(urlParams.get("nome"));
    const nomeInput = document.getElementById("nomeCompleto");
    if (nomeInput) nomeInput.value = nome;
  }
  if (urlParams.has("email")) {
    const email = decodeURIComponent(urlParams.get("email"));
    const emailInput = document.getElementById("email");
    if (emailInput) emailInput.value = email;
  }
  if (urlParams.has("instituicao")) {
    const inst = decodeURIComponent(urlParams.get("instituicao"));
    const instInput = document.getElementById("instituicao");
    if (instInput) instInput.value = inst;
  }
}

/**
 * configurarValidacaoCadastro
 * em tempo real ocorre a verificação se as senhas coincidem.
 * Exibe mensagem de erro se as senhas não forem iguais e mostra pop-up de sucesso ao cadastrar.
 */
function configurarValidacaoCadastro() {
  // Validação de senha e pop-up de sucesso
  const cadastroForm = document.getElementById("cadastroForm");
  if (!cadastroForm) return;

  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");
  const senhaErro = document.getElementById("senhaErro");

  function validarSenhasIguais() {
    if (senhaInput.value && confirmarSenhaInput.value) {
      senhaErro.style.display =
        senhaInput.value !== confirmarSenhaInput.value ? "block" : "none";
    } else {
      senhaErro.style.display = "none";
    }
  }

  senhaInput.addEventListener("input", validarSenhasIguais);
  confirmarSenhaInput.addEventListener("input", validarSenhasIguais);

  cadastroForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (senhaInput.value !== confirmarSenhaInput.value) {
      senhaErro.style.display = "block";
      return;
    }
    mostrarPopupSucesso(cadastroForm);
  });
}

/**
 * mostrarPopupSucesso
 * Exibe um pop-up/modal de sucesso após o cadastro ser realizado e redireciona para a página de login ao clicar em OK.
 */
function mostrarPopupSucesso(cadastroForm) {
  // Pop-up personalizado de sucesso
  let popup = document.createElement("div");
  popup.className = "modal fade";
  popup.id = "cadastroSucessoModal";
  popup.tabIndex = -1;
  popup.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">Cadastro realizado!</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body text-center">
                    <p class="mb-0">Seu cadastro foi realizado com sucesso!<br>Bem-vindo à UniMais.</p>
                </div>
                <div class="modal-footer">
                    <button id="okBtnCadastroSucesso" type="button" class="btn btn-success">OK</button>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(popup);
  const modal = new bootstrap.Modal(popup);
  modal.show();
  cadastroForm.reset();

  // Redireciona ao clicar em OK
  popup
    .querySelector("#okBtnCadastroSucesso")
    .addEventListener("click", function () {
      window.location.href = "login.html";
    });

  popup.addEventListener("hidden.bs.modal", function () {
    popup.remove();
  });
}

/**
 * configurarMascaraCPF
 * Adiciona uma máscara ao campo de CPF para formatar automaticamente enquanto o usuário digita.
 */
function configurarMascaraCPF() {
  const cpfInput = document.getElementById("cpf");
  if (!cpfInput) return;
  cpfInput.addEventListener("input", function () {
    let value = cpfInput.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    cpfInput.value = value;
  });
}
document.addEventListener("DOMContentLoaded", function () {
  configurarMascaraCPF();
});

/**
 * Formata o valor do campo de telefone no formato brasileiro (XX) XXXXX-XXXX.
 * Aceita até 11 dígitos numéricos, removendo quaisquer caracteres não numéricos.
 */
function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 2) v = "(" + v.slice(0, 2) + ") " + v.slice(2);
  if (v.length > 7) v = v.slice(0, 10) + "-" + v.slice(10);
  input.value = v;
}

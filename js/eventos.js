// =====================
// Variáveis Globais
// =====================
window.eventos = [
    {
        nome: "Simpósio de Tecnologia e Inovação",
        data: "10/06/2025",
        hora: "14h",
        gratuito: true,
        certificado: true,
        imagem: "images/cursos/tecnologia.png",
        descricao: "Encontro entre estudantes e profissionais da área de TI.",
    },
    {
        nome: "Palestra sobre Saúde Mental na Universidade",
        data: "18/06/2025",
        hora: "19h",
        gratuito: false,
        certificado: true,
        imagem: "images/cursos/psicologia.jpg",
        descricao: "Discussão aberta com psicólogos e educadores.",
    },
    {
        nome: "Feira de Empregabilidade Acadêmica",
        data: "25/06/2025",
        hora: "09h",
        gratuito: true,
        certificado: false,
        imagem: "images/cursos/empregabilidade.jpg",
        descricao: "Empresas parceiras apresentam oportunidades e programas.",
    },
];

window.universidadesPromotoras = [
    "FAMETRO",
    "UNINORTE",
    "ESBAM"
];

window.descricoesDetalhadas = [
    "O Simpósio de Tecnologia e Inovação reúne especialistas, professores e estudantes para debater tendências, desafios e oportunidades no setor de TI. Inclui palestras, painéis, networking e apresentação de projetos inovadores. Ideal para quem busca atualização e conexões profissionais.",
    "A palestra aborda a importância do cuidado com a saúde mental no ambiente universitário, estratégias de prevenção, apoio psicológico e relatos de experiências. Espaço para perguntas e troca de vivências com profissionais renomados da área.",
    "A Feira de Empregabilidade Acadêmica conecta alunos e empresas, oferecendo palestras sobre carreira, workshops de currículo, processos seletivos simulados e stands de recrutamento. Oportunidade única para ampliar sua rede e conquistar vagas de estágio e trainee."
];

// =====================
// DOMContentLoaded
// =====================
document.addEventListener("DOMContentLoaded", function () {
    // Elementos principais
    const eventos = window.eventos;
    const container = document.getElementById("eventosContainer");
    const inputBusca = document.getElementById("filtroBusca");
    const inputImagem = document.getElementById("novoImagem");
    const previewImagem = document.getElementById("previewImagem");

    // ========= Funções Utilitárias =========

    // Converte data dd/mm/yyyy para Date
    function parseDataBR(dataStr) {
        const [dia, mes, ano] = dataStr.split("/").map(Number);
        return new Date(ano, mes - 1, dia);
    }

    // Filtra eventos conforme filtros selecionados
    function filtrarEventos() {
        const gratuito = document.getElementById("filtroGratuito").checked;
        const certificado = document.getElementById("filtroCertificado").checked;
        const proximos7 = document.getElementById("filtroProximos7").checked;
        const busca = inputBusca.value.trim().toLowerCase();
        const universidade = document.getElementById("filtroUniversidade").value;
        const tipo = document.getElementById("filtroTipo").value;
        const hoje = new Date();
        const daqui7 = new Date();
        daqui7.setDate(hoje.getDate() + 7);

        return eventos.filter((evento, idx) => {
            let ok = true;
            if (gratuito) ok = ok && evento.gratuito;
            if (certificado) ok = ok && evento.certificado;
            if (proximos7) {
                const dataEv = parseDataBR(evento.data);
                dataEv.setHours(0, 0, 0, 0);
                hoje.setHours(0, 0, 0, 0);
                daqui7.setHours(23, 59, 59, 999);
                ok = ok && dataEv >= hoje && dataEv <= daqui7;
            }
            if (busca.length > 1) {
                const texto = `${evento.nome} ${evento.descricao}`.toLowerCase();
                ok = ok && texto.includes(busca);
            }
            if (universidade) {
                ok = ok && window.universidadesPromotoras[idx] === universidade;
            }
            if (tipo) {
                ok = ok && evento.nome.toLowerCase().startsWith(tipo.toLowerCase());
            }
            return ok;
        });
    }
    window.filtrarEventos = filtrarEventos;

    // Renderiza os cards de eventos
    /**
     * Renderiza uma lista de eventos no container da página.
     * Limpa o conteúdo anterior e exibe cards para cada evento, incluindo informações como nome, descrição, data, hora, universidade promotora e botões de ação.
     * Exibe um alerta caso nenhum evento seja encontrado.
     * 
     * @param {Array<Object>} lista - Lista de objetos de eventos a serem renderizados.
     */
    function renderizarEventos(lista) {
        container.innerHTML = "";
        if (lista.length === 0) {
            container.innerHTML = `<div class='col-12'><div class='alert alert-warning text-center rounded-4 shadow-sm'>Nenhum evento encontrado com os filtros selecionados.</div></div>`;
            return;
        }
        lista.forEach((evento, index) => {
            const card = document.createElement("div");
            card.className = "col-md-6 col-xl-4 mb-4";
            card.innerHTML = `
                <div class="card evento-card h-100 shadow-lg border-0 rounded-4 overflow-hidden animate__animated animate__fadeInUp" style="background: linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%);">
                    <div class="position-relative">
                        <img src="${evento.imagem}" class="evento-img card-img-top object-fit-cover" alt="Imagem do evento" style="height: 220px; object-fit: cover; border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem;">
                        <div class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
                            ${evento.certificado
                                ? '<span class="badge bg-success badge-cert shadow-sm">Certificação</span>'
                                : '<span class="badge bg-secondary badge-cert shadow-sm">Sem Certificado</span>'
                            }
                            ${evento.gratuito
                                ? '<span class="badge bg-primary badge-gratis shadow-sm">Gratuito</span>'
                                : '<span class="badge bg-warning text-dark badge-gratis shadow-sm">Pago</span>'
                            }
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold mb-2 text-primary-emphasis">${evento.nome}</h5>
                        <p class="card-text text-secondary mb-3" style="min-height: 60px;">${evento.descricao}</p>
                        <div class="mb-3">
                            <span class="d-inline-block px-3 py-1 rounded-pill bg-light text-dark small shadow-sm">
                                <i class="bi bi-calendar-event me-1"></i> ${evento.data}
                            </span>
                            <span class="d-inline-block px-3 py-1 rounded-pill bg-light text-dark small shadow-sm ms-2">
                                <i class="bi bi-clock me-1"></i> ${evento.hora}
                            </span>
                        </div>
                        <div class="mb-2">
                            <span class="badge bg-dark text-white">Universidade: ${window.universidadesPromotoras[index]}</span>
                        </div>
                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm ver-mais-btn rounded-pill px-3 fw-semibold" data-index="${index}">
                                <i class="bi bi-info-circle me-1"></i>Ver mais
                            </button>
                            <button class="btn btn-primary btn-sm inscrever-card-btn rounded-pill px-3 fw-semibold" data-index="${index}">
                                <i class="bi bi-pencil-square me-1"></i>Inscrever-se
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        adicionarListeners();
    }
    window.renderizarEventos = renderizarEventos;

    // Adiciona listeners aos botões dos cards
    function adicionarListeners() {
        document.querySelectorAll(".ver-mais-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = Number(this.dataset.index);
                const eventosFiltrados = filtrarEventos();
                const evento = eventosFiltrados[index];
                const eventoOriginalIndex = eventos.findIndex(ev =>
                    ev.nome === evento.nome && ev.data === evento.data
                );
                document.getElementById("eventoModalLabel").textContent = evento.nome;
                document.getElementById("eventoModalImg").src = evento.imagem;
                document.getElementById("eventoModalImg").alt = "Imagem do evento";
                document.getElementById("eventoModalDescricao").textContent = evento.descricao;
                document.getElementById("eventoModalDescricaoDetalhada").textContent = window.descricoesDetalhadas[eventoOriginalIndex] || "";
                document.getElementById("eventoModalUniversidade").textContent = `Universidade: ${window.universidadesPromotoras[eventoOriginalIndex] || ""}`;
                document.getElementById("eventoModalDataHora").innerHTML = `
                    <span class="d-inline-block px-3 py-1 rounded-pill bg-light text-dark small shadow-sm">
                        <i class="bi bi-calendar-event me-1"></i> ${evento.data}
                    </span>
                    <span class="d-inline-block px-3 py-1 rounded-pill bg-light text-dark small shadow-sm ms-2">
                        <i class="bi bi-clock me-1"></i> ${evento.hora}
                    </span>
                `;
                document.getElementById("eventoModalBadges").innerHTML = `
                    ${evento.certificado
                        ? '<span class="badge bg-success badge-cert shadow-sm me-1">Certificação</span>'
                        : '<span class="badge bg-secondary badge-cert shadow-sm me-1">Sem Certificado</span>'
                    }
                    ${evento.gratuito
                        ? '<span class="badge bg-primary badge-gratis shadow-sm">Gratuito</span>'
                        : '<span class="badge bg-warning text-dark badge-gratis shadow-sm">Pago</span>'
                    }
                `;
                document.getElementById("inscreverBtn").onclick = function () {
                    alert(`Inscrição realizada para: ${evento.nome}`);
                };
                const modal = new bootstrap.Modal(document.getElementById('eventoModal'));
                modal.show();
            });
        });
        document.querySelectorAll(".inscrever-card-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = Number(this.dataset.index);
                const evento = filtrarEventos()[index];
                alert(`Inscrição realizada para: ${evento.nome}`);
            });
        });
    }

    // ========= Listeners dos Filtros =========
    document.getElementById("filtroGratuito").addEventListener("change", () => {
        renderizarEventos(filtrarEventos());
    });
    document.getElementById("filtroCertificado").addEventListener("change", () => {
        renderizarEventos(filtrarEventos());
    });
    document.getElementById("filtroProximos7").addEventListener("change", () => {
        renderizarEventos(filtrarEventos());
    });
    inputBusca.addEventListener("input", () => {
        renderizarEventos(filtrarEventos());
    });
    document.getElementById("filtroUniversidade").addEventListener("change", () => {
        renderizarEventos(filtrarEventos());
    });
    document.getElementById("filtroTipo").addEventListener("change", () => {
        renderizarEventos(filtrarEventos());
    });

    // ========= Modal de Evento =========
    if (!document.getElementById("eventoModal")) {
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `
            <div class="modal fade" id="eventoModal" tabindex="-1" aria-labelledby="eventoModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-4 shadow-lg border-0">
                        <div class="modal-header bg-primary text-white rounded-top-4">
                            <h5 class="modal-title fw-bold" id="eventoModalLabel"></h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div class="modal-body">
                            <img id="eventoModalImg" class="img-fluid rounded-3 mb-3 shadow-sm" style="max-height: 250px; object-fit: cover; width: 100%;" />
                            <p id="eventoModalDescricao" class="text-secondary"></p>
                            <p id="eventoModalDescricaoDetalhada" class="text-secondary small mb-3"></p>
                            <p id="eventoModalUniversidade" class="text-dark fw-semibold mb-2"></p>
                            <p id="eventoModalDataHora" class="mb-2"></p>
                            <div id="eventoModalBadges" class="mb-3"></div>
                        </div>
                        <div class="modal-footer bg-light rounded-bottom-4">
                            <button id="inscreverBtn" class="btn btn-primary rounded-pill px-4 fw-semibold">
                                <i class="bi bi-pencil-square me-1"></i>Inscrever-se
                            </button>
                            <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    // ========= Modal Novo Evento =========
    document.getElementById("btnNovoEvento").addEventListener("click", function () {
        const form = document.getElementById("formNovoEvento");
        const preview = document.getElementById("previewImagem");
        form.reset();
        preview.src = "";
        preview.style.display = "none";
        const modalEl = document.getElementById("modalNovoEvento");
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
        modalEl.addEventListener(
            "hidden.bs.modal",
            () => {
                document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
                document.body.classList.remove("modal-open");
                document.body.style = "";
            },
            { once: true }
        );
    });

    // Preview da imagem selecionada
    inputImagem.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (ev) {
                previewImagem.src = ev.target.result;
                previewImagem.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            previewImagem.src = "";
            previewImagem.style.display = "none";
        }
    });

    // ========= Criação de Novo Evento =========
    document.getElementById("formNovoEvento").addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("novoNome").value.trim();
        const descricao = document.getElementById("novoDescricao").value.trim();
        const descricaoDetalhada = document.getElementById("novoDescricaoDetalhada").value.trim();
        const data = document.getElementById("novoData").value;
        const hora = document.getElementById("novoHora").value;
        const universidade = document.getElementById("novoUniversidade").value;
        const tipo = document.getElementById("novoTipo").value;
        const certificado = document.getElementById("novoCertificado").checked;
        const tipoValorRadio = document.querySelector('input[name="novoTipoValor"]:checked');
        if (!tipoValorRadio) {
            alert("Escolha se o evento é Gratuito ou Pago.");
            return;
        }
        const tipoValor = tipoValorRadio.value;
        const gratuito = tipoValor === "gratuito";
        let imagem = "images/cursos/tecnologia.png";
        if (inputImagem.files && inputImagem.files[0]) {
            imagem = previewImagem.src;
        }
        let dataFormatada = "";
        if (data) {
            dataFormatada = data.split("-").reverse().join("/");
        }
        if (!nome || !descricao || !data || !hora || !universidade || !tipo) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
        window.eventos.unshift({
            nome: tipo ? `${tipo} ${nome}` : nome,
            data: dataFormatada,
            hora: hora,
            gratuito: gratuito,
            certificado: certificado,
            imagem: imagem,
            descricao: descricao
        });
        window.universidadesPromotoras.unshift(universidade);
        window.descricoesDetalhadas.unshift(descricaoDetalhada);
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalNovoEvento'));
        if (modal) modal.hide();
        this.reset();
        previewImagem.src = "";
        previewImagem.style.display = "none";
        renderizarEventos(filtrarEventos());
        // Popup de sucesso
        const popup = document.createElement("div");
        popup.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg rounded-4 border-0 d-flex align-items-center justify-content-center animate__animated animate__fadeInDown";
        popup.style.zIndex = 3000;
        popup.style.minWidth = "320px";
        popup.style.maxWidth = "90vw";
        popup.style.fontSize = "1.15rem";
        popup.style.fontWeight = "600";
        popup.style.letterSpacing = "0.5px";
        popup.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)";
        popup.style.background = "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)"; // verde
        popup.style.color = "#fff";
        popup.style.border = "none";
        popup.style.opacity = "1";
        popup.style.transition = "opacity 0.5s";
        popup.innerHTML = `
            <i class="bi bi-check-circle-fill me-2" style="font-size:1.5rem;"></i>
            Evento criado com sucesso!
        `;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.style.opacity = "0";
            popup.addEventListener("transitionend", () => popup.remove());
        }, 1800);
    });

    // ========= Renderização Inicial =========
    renderizarEventos(filtrarEventos());
});

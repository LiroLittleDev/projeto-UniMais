    document.getElementById('formInscricao').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Inscrição enviada com sucesso! Em breve entraremos em contato.');
      this.reset();
    });

        document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Login enviado! Em breve redirecionaremos.');
    });
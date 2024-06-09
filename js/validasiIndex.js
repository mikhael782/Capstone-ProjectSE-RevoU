// validasi input user index.html
document.getElementById('inputForm').addEventListener('submit', function(event){
    var namaLengkap = document.getElementById('nama_lengkap').value;
    var email = document.getElementById('email').value;
    var section = document.getElementById('section').value;
    var team = document.getElementById('team').value;
    var pesan = document.getElementById('pesan').value;
    var error_message = '';

    // validasi untuk nama lengkap
    if (!namaLengkap.trim()){  
        // trim digunakan untuk menghapus spasi diawal dan diujung string
        error_message += 'Nama lengkap harus diisi.\n';
    }

    // validasi untuk email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)){
        error_message += 'Format email tidak valid.\n';
    }

    // validasi untuk section
    if (section === ''){
        error_message += 'Section tidak boleh kosong. \n';
    }

    // validasi untuk tim
    if (team === ''){
        error_message += 'Tim tidak boleh kosong. \n';
    }

    // validasi untuk pesan
    if (pesan === ''){
        error_message += 'Pesan tidak boleh kosong. \n';
    }

    // jika error, maka pesan tidak akan terkirim
    if (error_message){
        alert(error_message);
        event.preventDefault();
    }
});
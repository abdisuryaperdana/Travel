jQuery(document).ready(function() {
    // Call the backstretch function on the specified div
    // done
    $("#custom-background").backstretch([
        "assets/images/background/backgroundsumut1.png",
        "assets/images/background/backgroundsumut2.png",
        "assets/images/background/backgroundsumut3.png",
        "assets/images/background/backgroundsumut4.png"
    ], {
        duration: 3000,  // Transition duration in milliseconds
        fade: 750       // Fade speed in milliseconds
    });
});

// form input booking
function openPopupForm(i) {
    document.getElementById('popup-form-'+i).style.display = 'flex';
  }
  
function closePopupForm(i) {
  document.getElementById('popup-form-'+i).style.display = 'none';
}
  
function submitForm(action, id, pop_up) {
  if(action == 'editbooked'){
    const nama = document.getElementById('nama-'+id).value;
    const nohp = document.getElementById('no-hp-'+id).value;
    const jumlahorang = document.getElementById('jumlah-orang-'+id).value;
    const jadwal = document.getElementById('hari-tgl-'+id).value;
    const kegiatan = document.getElementById('kegiatan-'+id).value;
    const jam = document.getElementById('jam-'+id).value;

    const data_booking = {
        nama,
        nohp,
        jumlahorang,
        jadwal,
        kegiatan,
        jam,
      };

    try {
      const response = fetch("http://localhost:8000/"+action+"/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_booking),
      });
      alert("Terima Kasih, Edit Data Booking berhasil!");
      window.location.reload();
    }
    catch(err) {
      alert("Edit Data Booking gagal!");
    }
    closePopupForm(pop_up);
  }else if(action == 'editfest'){
    const name_foto = Math.random().toString(36).substr(2, 12)+".jpg";
    
    // Ambil nilai dari inputan
    const nama = document.getElementById('nama-kegiatan-festival-'+id).value;
    const deskripsi = document.getElementById('deskripsi-festival-'+id).value;
    const jadwal = document.getElementById('jadwal-festival-'+id).value;
    const lokasi = document.getElementById('lokasi-festival-'+id).value;
    const gmaps = document.getElementById('gmaps-festival-'+id).value;
    const foto = name_foto;
    const jenis = 'Festival';

    const data_festival = {
        nama,
        jadwal,
        lokasi,
        jenis,
        gmaps,
        deskripsi,
        foto,
      };

  
    try {
      const response = fetch("http://localhost:8000/"+action+"/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_festival),
      });
      alert("Terima Kasih, Edit Data Festival berhasil!");
      window.location.reload();
    }
    catch(err) {
      alert("Edit Data Festival gagal!");
    }

    var fileInput = document.getElementById("foto-festival-"+id);
                  
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file);

        var a = document.createElement('a');
        a.href = url;

        // Ganti 'new-filename.jpg' dengan nama file yang diinginkan
        a.download = name_foto;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Please select an image to save.');
    }
    closePopupForm(pop_up);
  }else if(action == 'editpameran'){
    const name_foto = Math.random().toString(36).substr(2, 12)+".jpg";

    // Ambil nilai dari inputan
    const nama = document.getElementById('nama-kegiatan-pameran-'+id).value;
    const deskripsi = document.getElementById('deskripsi-pameran-'+id).value;
    const jadwal = document.getElementById('jadwal-pameran-'+id).value;
    const lokasi = document.getElementById('lokasi-pameran-'+id).value;
    const gmaps = document.getElementById('gmaps-pameran-'+id).value;
    const foto = name_foto;
    const jenis = 'Pameran';

    const data_pameran = {
        nama,
        jadwal,
        lokasi,
        jenis,
        gmaps,
        deskripsi,
        foto,
      };

  
    try {
        const response = fetch("http://localhost:8000/"+action+"/"+id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_pameran),
        });
        alert("Terima Kasih, Edit Data Pameran berhasil!");
        window.location.reload();
      }
      catch(err) {
        alert("Edit Data Pameran gagal!");
      }

    var fileInput = document.getElementById("foto-pameran-"+id);
                  
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var url = URL.createObjectURL(file);

        var a = document.createElement('a');
        a.href = url;

        // Ganti 'new-filename.jpg' dengan nama file yang diinginkan
        a.download = name_foto;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('Please select an image to save.');
    }
    closePopupForm(pop_up);
  }
}
function Delete(action, id){
  try {
    const response = fetch("http://localhost:8000/"+action+"/"+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data_pameran),
    });
    alert("Terima Kasih, Delete Data berhasil!");
    window.location.reload();
  }
  catch(err) {
    alert("Delete Data Gagal!");
  }
}
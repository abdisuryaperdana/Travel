// form input booking
function openPopupForm(i) {
    document.getElementById('popup-form-'+i).style.display = 'flex';
  }
  
  function closePopupForm(i) {
    document.getElementById('popup-form-'+i).style.display = 'none';
  }
  
    function submitForm(action) {
      if(action == 'booking'){
        // Ambil nilai dari inputan
        var nama = document.getElementById('nama').value;
        var noHp = document.getElementById('no-hp').value;
        var jumlahOrang = document.getElementById('jumlah-orang').value;
        var hari = document.getElementById('hari-tgl').value;
        var kegiatan = document.getElementById('kegiatan').value;
  
      
        // Lakukan sesuatu dengan nilai inputan, misalnya kirim ke server atau tampilkan di console
        console.log('Nama:', nama);
        console.log('No HP:', noHp);
        console.log('Jumlah Orang:', jumlahOrang);
        console.log('Hari:', hari);
        console.log('Kegiatan:', kegiatan);
      
        // Tutup pop-up form
        closePopupForm();
      }else if(action == 'festival'){
        // Ambil nilai dari inputan
        var nama_festival = document.getElementById('nama-kegiatan-festival').value;
        var desk_festival = document.getElementById('deskripsi-festival').value;
        var jdwl_festival = document.getElementById('jadwal-festival').value;
        var lokasi_festival = document.getElementById('lokasi-festival').value;
        var gmaps_festival = document.getElementById('gmaps-festival').value;
  
      
        // Lakukan sesuatu dengan nilai inputan, misalnya kirim ke server atau tampilkan di console
        console.log('nama_festival:', nama_festival);
        console.log('desk_festival:', desk_festival);
        console.log('jdwl_festival:', jdwl_festival);
        console.log('lokasi_festival:', lokasi_festival);
        console.log('gmaps_festival:', gmaps_festival);
      
        // Tutup pop-up form
        closePopupForm();
      }else if(action == 'pameran'){
        // Ambil nilai dari inputan
        var nama_pameran = document.getElementById('nama-kegiatan-pameran').value;
        var desk_pameran = document.getElementById('deskripsi-pameran').value;
        var jdwl_pameran = document.getElementById('jadwal-pameran').value;
        var lokasi_pameran = document.getElementById('lokasi-pameran').value;
        var gmaps_pameran = document.getElementById('gmaps-pameran').value;
  
      
        // Lakukan sesuatu dengan nilai inputan, misalnya kirim ke server atau tampilkan di console
        console.log('nama_pameran:', nama_pameran);
        console.log('desk_pameran:', desk_pameran);
        console.log('jdwl_pameran:', jdwl_pameran);
        console.log('lokasi_pameran:', lokasi_pameran);
        console.log('gmaps_pameran:', gmaps_pameran);
      
        // Tutup pop-up form
        closePopupForm();
      }
    }
    
    // Tambahan: Menambahkan event listener ke tombol untuk membuka pop-up form
    document.querySelector('.custom-btn').addEventListener('click', openPopupForm);
    
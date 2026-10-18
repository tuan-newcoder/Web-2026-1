/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const danhSach = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const oTimKiem = document.getElementById("o-tim-kiem");
const khongThay = document.getElementById("khong-thay");

function capNhatBoDem() {
	const dsTin = Array.from(danhSach.querySelectorAll("li"));
	const soTinHien = dsTin.filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soTinHien}/${dsTin.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	const dsTin = Array.from(danhSach.querySelectorAll("li"));

	for (const tin of dsTin) {
		const noiDung = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		const khop = noiDung.toLowerCase().includes(tuKhoaThuong);
		tin.classList.toggle("an", !khop);
	}

	const soTinHien = dsTin.filter(tin => !tin.classList.contains("an")).length;
	if (soTinHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSach.addEventListener("click", (e) => {
	const nut = e.target.closest("button.more");
	if (nut === null || !danhSach.contains(nut)) {
		return;
	}
	const mucTin = nut.closest("li");
	const doan = mucTin.querySelector("p");
	const dangMo = doan.classList.toggle("day-du");
	nut.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

nutDang.addEventListener("click", () => {
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const mucMoi = document.createElement("li");
	const ngay = document.createElement("span");
	const tieuDe = document.createElement("h3");
	const noiDung = document.createElement("p");
	const nutMore = document.createElement("button");

	ngay.className = "time";
	ngay.textContent = homNay();
	tieuDe.textContent = oTieuDe.value;
	noiDung.textContent = oNoiDung.value;
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";
	mucMoi.append(ngay, tieuDe, noiDung, nutMore);
	danhSach.prepend(mucMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

locTin();

export const VIET_HOA =
  'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ';

//website http://abc.vn hoặc https://abc.com
export const WEBSITE = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d{1,5})?(\/\S*)?$/;

//format date DD/MM/YYYY
export const DATE = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

//mật khẩu ít nhất 8 ký tự, tối đa 50 ký tự chứa ít nhất 1 ký tự viết hoa, 1 ký tự thường, 1 ký tự đặc biệt
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//phone number 0912345678 hoặc 01234567899 10, 11 chữ số
export const PHONE_NUMBER = /^0[1-9]{1}[0-9]{8,9}$/;

//Check 1 số ký tự đặc biệt của HTML
// export const ESCAPE_HTML_TAG = /[/\\><]/;
// export const ESCAPE_HTML_TAG = /[^<>/\\]$/g;
export const ESCAPE_HTML_TAG = /^[^<>]*$/g;

//Không chưa ký tự đặc biệt và cả khoảng trắng
export const ESCAPE_SPECIAL_CHARATER = /^[a-zA-Z0-9-_]*$/g;

//Không chưa ký tự đặc biệt (đc phép có khoảng trắng)
export const ESCAPE_SPECIAL_CHARATERV2 = /^[a-zA-Z0-9-_\s]*$/g;

import React, { useEffect, useState } from "react";
import Navigation from "../common/nav.jsx";
import "./css/register.css"
import userAPI from "../api/userAPI";


export default function Register() {
    const [messageEmailInvalid, setMessageEmailInvalid] = useState('Email không hợp lệ');
    const [messageUsernameInvalid, setMessageUsernameInvalid] = useState('Vui lòng nhập nhập tên đăng nhập.');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState(''); // dob: date of birth
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameLengthValid, setIsNameLengthValid] = useState(false);
    const [isUsernameLengthValid, setIsUsernameLengthValid] = useState(false);


    const [isNameSpecialChar, setIsNameSpecialChar] = useState(false);
    const [isUsernameSpecialChar, setIsUsernameSpecialChar] = useState(false);
    const [isPasswordSpecialChar, setIsPasswordSpecialChar] = useState(false);

    const [isNameValid, setIsNameValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isDobValid, setIsDobValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isGenderValid, setIsGenderValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
 
    
    useEffect(() => {
        if (!gender) {
            setGender('true');
        }
        setIsNameValid(name.trim() !== '');
        setIsPhoneValid(phone.trim() !== '' && isVietnamesePhoneNumber(phone));
        setIsDobValid(dob.trim() !== '');
        setIsEmailValid(email.trim() !== '' && validateEmail(email));
        setIsGenderValid(gender.trim() !== '');
        setIsUsernameValid(username.trim() !== '');
        setIsPasswordValid(password.trim() !== '');
        setIsConfirmPasswordValid(password.trim() === confirmPassword);

        setIsNameLengthValid(name.trim().length == 0 || name.trim().length >= 3);
        setIsUsernameLengthValid(username.trim().length == 0 || username.length >= 3);
        setIsNameSpecialChar(hasSpecialCharacters(name));
        setIsUsernameSpecialChar(hasSpecialCharacters(username));
        setIsPasswordSpecialChar(hasSpecialCharacters(password));

    }, [
        name,
        phone,
        dob,
        email,
        gender,
        username,
        password,
        confirmPassword
    ]);

    const [nameTouched, setNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [dobTouched, setDobTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [genderTouched, setGenderTouched] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);


    const handleBlur = () => {
        setNameTouched(true);
        setPhoneTouched(true);
        setDobTouched(true);
        setEmailTouched(true);
        setGenderTouched(true);
        setUsernameTouched(true);
        setPasswordTouched(true);
        setConfirmPasswordTouched(true);
    }
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            phone: phone,
            dob: dob,
            email: email,
            gender: gender,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }
       
    
        if (!isNameValid
            || !isPhoneValid
            || !isDobValid
            || !isEmailValid
            || !isGenderValid
            || !isUsernameValid
            || !isPasswordValid
            || !isConfirmPasswordValid
            || isUnderAge(dob)
        ) {
            alert('Đăng ký thất bại.');
        } else {
            userAPI.register(data).then(r => {
                if (r.toString() === 'EMAIL_EXISTED') {
                    setMessageEmailInvalid('Email đã tồn tại');
                    setIsEmailValid(false);
                } else if (r.toString() === 'USERNAME_EXISTED') {
                    setMessageUsernameInvalid('Tên đăng nhập đã tồn tại');
                    setIsUsernameValid(false);
                }
                else { 
                    alert('Đăng ký thành công.');
                    window.location.href = '/';
                }
            })
        }
    };



    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const isVietnamesePhoneNumber = (phone) => {
        return phone.match(/^(0[3|5|7|8|9])+([0-9]{8})$/);
    }



    const hasSpecialCharacters = (text) => {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return regex.test(text);
    };

    const isUnderAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 12) {
            return true;
        }
        return false;
    };
 
    return (<>
        <div className="container-fluid p-0 m-0">
            <div className="container-fluid">{<Navigation />}</div>

        </div>
        <div>      
            
            <div className="container py-3 my-5 w-50 border rounded p-0">
                <h2 className="text-center">Đăng ký</h2>
                <div className="container px-5">
                    {/* form start */}
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên</label>
                            <input type="text" className="form-control" required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {isNameValid || !nameTouched ? null : (<div className="invalid">
                                Vui lòng nhập tên
                            </div>)}
                            {!isNameLengthValid && nameTouched ? (
                                <div className="invalid mb-0">
                                    Tên phải có ít nhất 3 kí tự
                                </div>
                            ) : null}
                            {nameTouched && isNameSpecialChar && (
                                <div className="invalid">
                                    Tên không được chứa kí tự đặc biệt
                                </div>
                            )}
                        </div>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label className="form-label">Điện thoại</label>
                                <input type="email" className="form-control" required={true}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {isPhoneValid || !phoneTouched ? null : (
                                    <div className="invalid">
                                        Số điện thoại không hợp lệ
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Ngày sinh</label>
                                <input type="date" className="form-control" required={true}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                                {isDobValid || !dobTouched ? null : (
                                    <div className="invalid">
                                        Vui lòng nhập ngày sinh
                                    </div>
                                )}
                                {(isUnderAge(dob) && dobTouched) && (
                                    <div className="invalid">
                                        Bạn phải đủ 12 tuổi để đăng ký.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Email </label>
                            <input type="email" className="form-control" required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {isEmailValid || !emailTouched ? null : (
                                <div className="invalid">
                                    {messageEmailInvalid}
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <div className="d-flex">
                                <label className="form-label me-5">Giới tính</label>
                                <div className="form-check me-2">
                                    <input className="form-check-input" type="radio" name="gender" id="male" 
                                    checked={gender==='true'}
                                        defaultValue="true" required={true}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="male">Nam</label>
                                </div>
                                <div className="form-check me-2">
                                    <input className="form-check-input" type="radio" name="gender" id="female"
                                        defaultValue="false" required={true}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="female">Nữ</label>
                                </div>
                            </div>
                            {isGenderValid || !genderTouched ? null : (
                                <div className="invalid">
                                    Vui lòng chọn giới tính
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên đăng nhập </label>
                            <input type="text" className="form-control" required={true}
                                onChange={(e) => setUsername(e.target.value)} />
                            {isUsernameValid || !usernameTouched ? null : (
                                <div className="invalid mb-0">
                                    {messageUsernameInvalid}
                                </div>
                            )}
                            {nameTouched && isUsernameSpecialChar && (
                                <div className="invalid mb-0">
                                    Tên đăng nhập không được chứa kí tự đặc biệt
                                </div>
                            )}
                            {!isUsernameLengthValid && usernameTouched ? (
                                <div className="invalid mb-0">
                                    Tên đăng nhập phải có ít nhất 3 kí tự
                                </div>
                            ) : null}
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu </label>
                            <input type="password" className="form-control" required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isPasswordValid || !passwordTouched ? null : (
                                <div className="invalid">
                                    Vui lòng nhập mật khẩu
                                </div>
                            )}
                               {nameTouched && isPasswordSpecialChar&& (
                                <div className="invalid mb-0">
                                    Mật khẩu không được chứa kí tự đặc biệt
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập lại mật khẩu</label>
                            <input type="password" className="form-control" required={true}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {isConfirmPasswordValid || !confirmPasswordTouched ? null : (
                                <div className="invalid">
                                    Vui lòng nhập lại mật khẩu
                                </div>
                            )}
                        </div>
                        <div className="mb-3 d-flex flex-column align-items-center"><br />
                            <button style={{ backgroundColor: '#644c38', borderRadius: 10 }} type="submit"
                                className="btn btn-primary px-5 mb-3"
                                onClick={handleSubmit} onBlur={handleBlur}
                            >Đăng ký
                            </button>
                            <p>Bạn đã có tài khoản? <a href="#" style={{ color: '#644c38' }}>Đăng nhập</a></p>
                        </div>
                    </form>
                </div>
                {/* end form */}
                <div className="text-center mb-4">
                    <hr className="my-4 mx-3" style={{
                        border: 'none',
                        borderTop: '1px solid #000',
                        width: '30%',
                        display: 'inline-block',
                        verticalAlign: 'middle'
                    }} />
                    <span style={{ verticalAlign: 'middle' }}>Đăng nhập với</span>
                    <hr className="my-4 mx-3" style={{
                        border: 'none',
                        borderTop: '1px solid #000',
                        width: '30%',
                        display: 'inline-block',
                        verticalAlign: 'middle'
                    }} />
                    <br />
                    <div className="my-3">
                        <button style={{ borderRadius: 10 }} type="submit" className="btn px-5 me-3 border">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png"
                                alt="Facebook"
                                style={{ verticalAlign: 'middle', marginRight: 5, width: 32, height: 32 }} />
                            Facebook
                        </button>
                        <button style={{ borderRadius: 10 }} type="submit" className="btn px-5 border">
                            <img src="https://www.google.com/gmail/about/static/images/logo-gmail.png" alt="Google"
                                style={{ verticalAlign: 'middle', marginRight: 5, width: 32, height: 32 }} />
                            Gmail
                        </button>
                    </div>
                    <br />

                </div>
            </div>
        </div>
    </>
    );
}

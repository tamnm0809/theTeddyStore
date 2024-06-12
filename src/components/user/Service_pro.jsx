import React from 'react';

const Service_pro = () => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Các dịch vụ miễn phí</th>
                        <th>Các dịch vụ thu phí</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p><i class="bi bi-check2-circle"></i> Miễn phí gòi quà</p>
                            <p><i class="bi bi-check2-circle"></i> Miễn phí thiệp</p>
                            <p><i class="bi bi-check2-circle"></i> Miễn phí hút chân không</p>
                            <p><i class="bi bi-check2-circle"></i> Bảo hành đường may 6 tháng</p>
                            <p><i class="bi bi-check2-circle"></i> Đổi trả trong vòng 3 ngày</p>
                        </td>
                        <td>
                            <p><i class="bi bi-check2-circle"></i> Thêu lên áo gấu theo yêu cầu </p>
                            <p><i class="bi bi-check2-circle"></i> Thêu logo lên áo gấu theo yêu cầu</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Service_pro;

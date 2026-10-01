# KTXGo TH2

**TRẦN A TOÀN | MSSV 23672671 | Clone HTTPS: CHỜ ĐIỀN URL THỰC TẾ | Stamp #952109 | Số cuối: 1**

**VARIANT:** `watermarkAtTop=false`, `authField=phone`, `tabOrder=shopFirst`, `hapticOnAdd=selection`, `shipFormula=B`, `detailPresentation=card`.

## Cài đặt và chạy PowerShell

```powershell
npm install
$env:ANDROID_HOME = 'D:\LAP_TRINH_MOBILE\data1'
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
npm run start -- --port 8083
# Terminal khác
& "$env:ANDROID_HOME\platform-tools\adb.exe" -s emulator-5554 reverse tcp:8083 tcp:8083
$env:ANDROID_HOME\platform-tools\adb.exe -s emulator-5554 shell getprop ro.product.model
npm run android -- --deviceId emulator-5554 --port 8083
```

Kiểm tra tĩnh: `npm run typecheck`, `npm run lint`, `npm test -- --runInBand`.

## Dependency chính

React Native CLI 0.87.1, React Navigation v7, TanStack Query, Axios, Zustand + AsyncStorage persist, FlashList, `@react-native-community/geolocation` và `react-native-haptic-feedback`.

## Tính năng đã triển khai

- Auth Stack riêng, token giả `ktxgo-23672671-952109`, logout không quay lại được màn hình cũ.
- Bottom Tabs theo thứ tự Cửa hàng, Giỏ hàng, Tôi; badge là tổng quantity.
- API thật `https://fakestoreapi.com/products?limit=12`, interceptor `X-Student-Id`, cache `staleTime=21000`, debounce tìm kiếm 400 ms, FlashList 2 cột.
- Detail chỉ nhận `{ id: string }`, thêm giỏ từ Home/Detail, giá quy đổi `Math.round(price * 30500)` và định dạng `vi-VN`.
- Cart persist với khóa `ktxgo-cart-23672671`, tăng/giảm/xóa và giới hạn 99 sản phẩm mỗi dòng.
- Location có trạng thái granted/denied/blocked/error, mở Settings khi bị blocked, Haversine và công thức B: `9000 + Math.round(km * 1500) + 2000`.
- Watermark: `TH2 · 23672671 · TRẦN A TOÀN · #952109`.

## Location emulator

Tọa độ cổng KTX dùng thử: `10.762622, 106.660172` (giả định vì đề không cung cấp tọa độ). Trong Android Emulator chọn nút `...` > **Location**, nhập latitude/longitude rồi **Send**. Sau đó quay lại app và bấm **Lấy vị trí**. Quyền runtime thật vẫn được xin trước khi đọc GPS.

## Checklist đối chiếu

| Yêu cầu | Vị trí | Trạng thái kiểm tra |
|---|---|---|
| Constants, variant, stamp, theme | `src/constants/` | Đã typecheck |
| Auth, provider, Navigation v7 | `App.tsx`, `src/navigation/` | Đã typecheck + Jest mount |
| API, Query, debounce, FlashList | `src/services/`, `HomeScreen.tsx` | Đã typecheck; cần thao tác mạng trên emulator |
| Detail theo id, giá, thêm giỏ | `DetailScreen.tsx`, `ProductCard.tsx` | Đã typecheck; cần thao tác emulator |
| Persist, badge, tăng/giảm/xóa | `src/stores/cartStore.ts`, `CartScreen.tsx` | Đã typecheck; cần đóng/mở app thực tế |
| Location, permission, ship B | `useCampusLocation.ts`, `MeScreen.tsx` | Cần cấp/từ chối/block và gửi tọa độ trên emulator |
| Watermark an toàn | `Watermark.tsx` | Đã kiểm tra source; cần đọc trên ảnh thật |

## Chuẩn bị nộp giờ thi

- Tạo repo mới `23672671_TH2` đúng thời điểm thi.
- Tạo ít nhất 4 commit trong giờ thi; mỗi message chứa `23672671` và `TH2`.
- Push source, README và hai ảnh, không force-push.
- Điền URL thật vào dòng đầu README, mời giảng viên nếu repo private.
- Ảnh cần lưu đúng tên: `docs/screenshot-th2-home.png` và `docs/screenshot-th2-cart.png`.

Hiện workspace chưa có hai ảnh thật. Sau khi app chạy trên `emulator-5554`, mở Home đọc được watermark, dùng công cụ chụp màn hình Android lưu ảnh Home; chuyển sang Giỏ hàng và chụp ảnh thứ hai. Không đánh dấu ảnh đã hoàn tất trước khi kiểm tra bằng mắt.

## Giới hạn đã biết

Thanh toán thật, Camera, Drawer, i18n và Lottie nằm ngoài phạm vi đề. Token chỉ giữ trong bộ nhớ theo yêu cầu; giỏ hàng được persist.

23672671 TH2 - Da kiem tra thong tin bai nop va GitHub.

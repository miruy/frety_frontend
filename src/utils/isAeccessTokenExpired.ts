export const isAccessTokenExpired = (accessToken: string, gracePeriod: number = 0): boolean => {
    // JWT 토큰을 '.'로 분리
    const tokenParts = accessToken.split('.');

    // 페이로드 부분을 디코딩
    const payload = JSON.parse(atob(tokenParts[1]));

    // 현재 시간 (초 단위)
    const currentTime = Math.floor(Date.now() / 1000);

    // 만료 시간과 현재 시간을 비교 (여유 시간 적용)
    return payload.exp < (currentTime + gracePeriod);
};

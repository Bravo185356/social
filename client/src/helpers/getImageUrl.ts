export function getImageUrl(img: string) {
    return img && `http://localhost:8080/static/${img}`;
}
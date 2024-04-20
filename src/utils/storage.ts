import Cookies from "js-cookie";

type SetToStorageProps = {
  key: string;
  value: string;
  expireTime?: number | Date;
};

export function SetToStorage({ key, value, expireTime }: SetToStorageProps) {
  Cookies.set(key, value, { expires: expireTime });
}

export function GetFromStorage(key: string) {
  return Cookies.get(key);
}

export function RemoveFromStorage(key: string) {
  Cookies.remove(key);
}

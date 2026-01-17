// Simple mock upload: reads file as data URL and returns it after a short delay.
export async function uploadProfilePhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      // simulate network latency
      setTimeout(() => {
        resolve(reader.result as string);
      }, 800);
    };
    reader.readAsDataURL(file);
  });
}

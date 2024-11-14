/**
 * A component that renders a QR code based on the given value
 * If no value is given, it renders a "loading" message
 * @param {{value: string, size: number}} props
 * @returns {ReactElement}
 */
export const QrCodeCanvasUI =({value, size}) => {
  return (
    <div>
      {value ? (
        <img src={value} width={size} height={size} alt="QR Code" />
      ) : (
        <p>Загрузка QR-кода...</p>
      )}
    </div>
  );
}

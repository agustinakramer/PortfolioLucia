<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // O ajusta si lo bajaste manualmente

if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo "Faltan datos obligatorios.";
    exit();
}

$name = htmlspecialchars(strip_tags($_POST['name']));
$email = htmlspecialchars(strip_tags($_POST['email']));
$subject = htmlspecialchars(strip_tags($_POST['subject']));
$message = htmlspecialchars(strip_tags($_POST['message']));


$mail = new PHPMailer(true);



try {
    // Configuración del servidor SMTP de Gmail
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME'];
    $mail->Password = $_ENV['MAIL_PASSWORD'];
    $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];
    $mail->Port = $_ENV['MAIL_PORT'];

    // Datos del formulario
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);

    // Remitente y destinatario
    $mail->setFrom($_ENV['MAIL_USERNAME'], 'Formulario web');
    $mail->addAddress($_ENV['MAIL_TO']);

    // Contenido del correo
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = "Mensaje de $name <$email>:\n\n$message";

    $mail->send();
    http_response_code(200);
    echo 'Mensaje enviado correctamente.';
} catch (Exception $e) {
    http_response_code(500);
    echo "No se pudo enviar el mensaje. Error: {$mail->ErrorInfo}";
}
?>

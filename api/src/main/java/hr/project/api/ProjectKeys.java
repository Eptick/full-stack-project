package hr.project.api;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

@Component
public class ProjectKeys {

    public KeyPair keypair;

    @PostConstruct
    void init() {
        Optional<RSAPublicKey> pubKey = getParsedPublicKey();
        Optional<RSAPrivateKey> privateKey = getParsedPrivateKey();
        if(pubKey.isPresent() && privateKey.isPresent()) {
            keypair = new KeyPair(pubKey.get(), privateKey.get());
        } else {
            generateKeys();
        }
    }


    private void generateKeys() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            KeyPair pair = generator.generateKeyPair();
            PublicKey pub = pair.getPublic();
            PrivateKey priv = pair.getPrivate();
            
        
            OutputStream out = new FileOutputStream("classpath:auth/id_project.key");
            out.write(priv.getEncoded());
            out.close();

            out = new FileOutputStream("classpath:auth/id_project.pub");
            out.write(pub.getEncoded());
            out.close();
            init();
        } catch (Exception e) {
            System.out.print("Cannot generate keys");
        }
    }
    private Optional<RSAPublicKey> getParsedPublicKey(){

        try {
           File file = ResourceUtils.getFile("classpath:auth/id_project.pub");
           InputStream in = new FileInputStream(file);
           ByteArrayOutputStream result = new ByteArrayOutputStream();
           byte[] buffer = new byte[1024];
           for (int length; (length = in.read(buffer)) != -1; ) {
               result.write(buffer, 0, length);
           }
           in.close();

           
            X509EncodedKeySpec keySpecX509 = new X509EncodedKeySpec(result.toByteArray());
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            RSAPublicKey pubKey = (RSAPublicKey) keyFactory.generatePublic(keySpecX509);
            return Optional.of(pubKey);

        } catch (NoSuchAlgorithmException | InvalidKeySpecException | IOException e) {
            e.printStackTrace();
            System.out.println("Exception block | Public key parsing error ");
            return Optional.empty();
        }
   }

   private Optional<RSAPrivateKey> getParsedPrivateKey(){

    try {
       File file = ResourceUtils.getFile("classpath:auth/id_project.key");
       InputStream in = new FileInputStream(file);
       ByteArrayOutputStream result = new ByteArrayOutputStream();
       byte[] buffer = new byte[1024];
       for (int length; (length = in.read(buffer)) != -1; ) {
           result.write(buffer, 0, length);
       }
       in.close();
       
        PKCS8EncodedKeySpec keySpecX509 = new PKCS8EncodedKeySpec(result.toByteArray());
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        RSAPrivateKey pubKey = (RSAPrivateKey) keyFactory.generatePrivate(keySpecX509);
        return Optional.of(pubKey);

    } catch (NoSuchAlgorithmException | InvalidKeySpecException | IOException e) {
        e.printStackTrace();
        System.out.println("Exception block | Public key parsing error ");
        return Optional.empty();
    }
}
}

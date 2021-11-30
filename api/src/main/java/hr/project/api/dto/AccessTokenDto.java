package hr.project.api.dto;

public class AccessTokenDto {
    String access_token;

    public AccessTokenDto(String token) {
        this.access_token = token;
    }

    public String getAccess_token() {
        return this.access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

}

package com.galaxy.career.carreergalaxyapp.dtos;

public class ResumeDownloadResponse {

    private String downloadUrl;

    public ResumeDownloadResponse(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}

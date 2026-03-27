package com.galaxy.career.carreergalaxyapp.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class FileStorageUtil {

    private final String resumeDir = "uploads/resumes/";

    public String storeResume(MultipartFile file) throws IOException {

        File dir = new File(resumeDir);
        if (!dir.exists()) dir.mkdirs();

        String filePath = resumeDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        return filePath;
    }
}
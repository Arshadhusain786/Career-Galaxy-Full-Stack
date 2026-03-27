package com.galaxy.career.carreergalaxyapp.repositories;

import java.util.UUID;

public interface ProfileSummary {


        UUID getId();
        String getFullName();
        String getPhoneNumber();
        String getSummary();
        String getProfilePictureUrl();

}
